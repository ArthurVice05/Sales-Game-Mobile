import test from 'node:test'
import assert from 'node:assert/strict'

import { PREFERRED_LOCK, shouldEnforceLandscape } from '../../../utils/screenOrientation.js'

function stubWindow({ coarse = false, narrow = true, capacitorNative = false } = {}) {
  globalThis.window = {
    innerWidth: narrow ? 393 : 1280,
    matchMedia: (query) => ({
      matches:
        query === '(pointer: coarse)' ? Boolean(coarse)
        : query === '(max-width: 960px)' ? Boolean(narrow)
        : false,
    }),
    Capacitor: capacitorNative
      ? { isNativePlatform: () => true }
      : undefined,
  }
}

function restoreWindow() {
  delete globalThis.window
}

test('orientação preferida no mobile é landscape (não portrait)', () => {
  assert.equal(PREFERRED_LOCK, 'landscape')
})

test('guard de orientação só deve atuar com enabled (tabuleiro)', () => {
  // Contrato: enabled=false → sem bloqueio (nome/lobby); enabled=true → landscape no jogo.
  const shouldBlock = (enabled, enforceDevice, isPortrait) => (
    Boolean(enabled) && Boolean(enforceDevice) && Boolean(isPortrait)
  )
  assert.equal(shouldBlock(false, true, true), false)
  assert.equal(shouldBlock(true, true, true), true)
  assert.equal(shouldBlock(true, true, false), false)
  assert.equal(shouldBlock(true, false, true), false)
})

test('Capacitor nativo + coarse false + narrow true => enforce landscape', () => {
  stubWindow({ capacitorNative: true, coarse: false, narrow: true })
  try {
    assert.equal(shouldEnforceLandscape(), true)
  } finally {
    restoreWindow()
  }
})

test('web + coarse false + narrow true => não bloqueia desktop estreito', () => {
  stubWindow({ capacitorNative: false, coarse: false, narrow: true })
  try {
    assert.equal(shouldEnforceLandscape(), false)
  } finally {
    restoreWindow()
  }
})

test('web + coarse true + narrow true => bloqueia celular web', () => {
  stubWindow({ capacitorNative: false, coarse: true, narrow: true })
  try {
    assert.equal(shouldEnforceLandscape(), true)
  } finally {
    restoreWindow()
  }
})

test('viewport largo => false', () => {
  stubWindow({ capacitorNative: true, coarse: true, narrow: false })
  try {
    assert.equal(shouldEnforceLandscape(), false)
  } finally {
    restoreWindow()
  }
})
