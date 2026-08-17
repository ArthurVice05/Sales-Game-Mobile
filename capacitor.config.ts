import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor bootstrap — Android only nesta etapa.
 *
 * PENDÊNCIA: `appId` (br.com.salesgame.app) é provisório.
 * Confirmar o identificador definitivo antes da publicação nas lojas.
 *
 * Não usar `server.url`, `cleartext` nem `allowNavigation` genérico:
 * o WebView deve carregar os assets empacotados em `webDir` (`dist`).
 */
const config: CapacitorConfig = {
  appId: 'br.com.salesgame.app',
  appName: 'Sales Game',
  webDir: 'dist',
  backgroundColor: '#0E0E0E',
};

export default config;
