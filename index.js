const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();
  
  // Memilih hari acak dari 0 sampai 365 hari yang lalu dari hari ini
  const daysAgo = random.int(0, 365);
  const DATE = moment().subtract(daysAgo, 'days').format();
  const data = {
    date: DATE,
  };
  
  console.log(DATE);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};

makeCommit(100000);