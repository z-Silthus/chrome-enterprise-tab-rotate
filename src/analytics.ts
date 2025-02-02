/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const version = chrome.runtime.getManifest().version;

const _ga = (command: string, ...args: any): void => {
  if (window.ga) {
    ga(command, ...args);
  } else {
    console.log('ga not available');
  }
};

const state = {
  lastHeartbeatTime: 0,
};

const analytics = {
  startup: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'version',
      eventAction: 'manifest',
      eventLabel: version,
    }),
  localConfig: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'load-config',
      eventAction: 'local',
      eventLabel: version,
    }),
  remoteConfig: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'load-config',
      eventAction: 'remote',
      eventLabel: version,
    }),
  autoStart: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'background-action',
      eventAction: 'auto-start',
      eventLabel: version,
    }),
  start: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'start',
      eventLabel: version,
    }),
  stop: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'stop',
      eventLabel: version,
    }),
  reload: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'reload',
      eventLabel: version,
    }),
  autoReload: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'background-action',
      eventAction: 'reload',
      eventLabel: version,
    }),
  resume: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'resume',
      eventLabel: version,
    }),
  pause: () =>
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'pause',
      eventLabel: version,
    }),
  heartbeat: action => {
    console.log('analytics.heartbeat', action);
    _ga('send', {
      hitType: 'event',
      eventCategory: 'heartbeat',
      eventAction: action,
      eventLabel: version,
    });
  },
  install: () => {
    console.log('analytics: install');
    _ga('send', {
      hitType: 'event',
      eventCategory: 'user-action',
      eventAction: 'install',
      eventLabel: version,
    });
  },
  backgroundPageview: () => _ga('send', 'pageview', '/background.js'),
  optionsPageview: () => _ga('send', 'pageview', '/options.js'),
  analyticsHeartbeat(playStartTime) {
    console.log('analyticsHeartbeat');
    // All units in millis
    const now = new Date().getTime();
    const previous = state.lastHeartbeatTime || now;
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const uptime = now - playStartTime;

    const tenMinuteMark = playStartTime + 10 * MINUTE;
    const twentyMinuteMark = playStartTime + 20 * MINUTE;
    const thirtyMinuteMark = playStartTime + 30 * MINUTE;
    const fortyMinuteMark = playStartTime + 40 * MINUTE;
    const fiftyMinuteMark = playStartTime + 50 * MINUTE;
    const sixtyMinuteMark = playStartTime + 60 * MINUTE;

    previous < tenMinuteMark && tenMinuteMark < now && this.heartbeat('10mins');
    previous < twentyMinuteMark &&
      twentyMinuteMark < now &&
      this.heartbeat('20mins');
    previous < thirtyMinuteMark &&
      thirtyMinuteMark < now &&
      this.heartbeat('30mins');
    previous < fortyMinuteMark &&
      fortyMinuteMark < now &&
      this.heartbeat('40mins');
    previous < fiftyMinuteMark &&
      fiftyMinuteMark < now &&
      this.heartbeat('50mins');
    previous < sixtyMinuteMark &&
      sixtyMinuteMark < now &&
      this.heartbeat('60mins');

    const REALTIME_PULSE_INTERVAL = 3 * MINUTE;
    const lastPulseMark = now - (uptime % REALTIME_PULSE_INTERVAL);
    previous < lastPulseMark && lastPulseMark < now && this.heartbeat('pulse');

    const lastHourMark = now - (uptime % HOUR);
    previous < lastHourMark && lastHourMark < now && this.heartbeat('hour');

    const lastDayMark = now - (uptime % DAY);
    previous < lastDayMark && lastDayMark < now && this.heartbeat('day');

    const lastWeekMark = now - (uptime % WEEK);
    previous < lastWeekMark && lastWeekMark < now && this.heartbeat('week');

    const lastMonthMark = now - (uptime % MONTH);
    previous < lastMonthMark && lastMonthMark < now && this.heartbeat('month');

    const lastYearMark = now - (uptime % YEAR);
    previous < lastYearMark && lastYearMark < now && this.heartbeat('year');

    state.lastHeartbeatTime = now;
  },
};

analytics.startup();

export default analytics;