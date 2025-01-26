export const displayFancyLogs = () => {
  console.log(
    `%c    _                      ____  _                   _       
     / \\   _ __   __ _ ___  |  _ \\(_)_ __ ______ _  __| | __ _ 
    / _ \\ | '_ \\ / _\` / __| | |_) | | '__|_  / _\` |/ _\` |/ _\` |
   / ___ \\| | | | (_| \\__ \\ |  __/| | |   / / (_| | (_| | (_| |
  /_/   \\_\\_| |_|\\__,_|___/ |_|   |_|_|  /___\\__,_|\__,_|\\__,_|`,
    'color: #FFFFFF; font-family: monospace; white-space: pre;'
  );

  console.log(
    '%c Hope you like what you see :)',
    'color: #FFFFFF; padding: 6px;'
  );

  // Easter egg hint
  console.log(
    "%c 💡 Psst! There's a secret hiding in plain sight. Follow your heart, it might lead to something... interesting.",
    'color: #FFFFFF; font-style: italic; padding: 6px;'
  );
};
