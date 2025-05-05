export function handleOsCommands(os, arg) {
  if (arg === '--EOL') {
    const eol = JSON.stringify(os.EOL); 
    console.log(eol);
  } else if (arg === '--cpus') {
    const cpus = os.cpus();
    console.log(`Overall CPUs: ${cpus.length}`);

    cpus.forEach((cpu, index) => {
      const { model, speed } = cpu;
      console.log(`CPU ${index + 1}: ${model}, ${speed / 1000} GHz`);
    });
  } else if (arg === '--homedir') {
    const homeDir = os.homedir();
    console.log(homeDir);
  } else if (arg === '--username') {
    const userInfo = os.userInfo();
    console.log(userInfo.username);
  } else if (arg === '--architecture') {
    const architecture = os.arch();
    console.log(architecture);
  } else {
    console.log('Invalid argument');
  }
}