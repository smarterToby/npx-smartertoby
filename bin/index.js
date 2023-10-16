#! /usr/bin/env node
import Card from 'npmcard';
import chalk from 'chalk';
import inquirer from 'inquirer';
import clipboardy from 'clipboardy';
import open from 'open';


const card = new Card();

const user = {
  name: 'Tobias',
  npm: 'smartertoby',
  github: 'smartertoby',
  x: 'smartertoby',
  linkedin: 'tobiasreuss',
  medium: 'smartertoby',
  web: 'https://tobiasreuss.com',
  email: 'contact@tobiasreuss.com'
};


const createCard = () => {
  const link = card.chalk.gray;
  const label = card.chalk.white.bold;
  const nameColor = card.chalk.greenBright.bold;
  const usernameColor = card.chalk.greenBright;
  const text = card.chalk.white;
  const github = card.chalk.white;
  const x = card.chalk.white;
  const linkedin = card.chalk.hex('#0077B5');
  const medium = card.chalk.white;
  const npmjs = card.chalk.hex('#CC3534');
  const white = card.chalk.white;
  const italic = card.chalk.gray.italic.dim;

  const userInfo = [
    { label: '    Work:', value: 'Junior Software Engineer', formatter: text },
    { label: '  GitHub:', value: `https://github.com/${github(user.github)}`, formatter: link },
    { label: '       X:', value: `https://x.com/${x(user.x)}`, formatter: link },
    { label: 'LinkedIn:', value: `https://linkedin.com/in/${linkedin(user.linkedin)}`, formatter: link },
    { label: '  Medium:', value: `https://medium.com/@${medium(user.medium)}`, formatter: link },
    { label: '     NPM:', value: `https://npmjs.com/~${npmjs(user.npm)}`, formatter: link },
    { label: '     Web:', value: `${white(user.web)}`, formatter: link },
  ];

  card.setHeader(`${nameColor(user.name)} / ${usernameColor("@" + user.npm)}`);

  userInfo.forEach(info => {
    card.addRow([label(info.label), info.formatter(info.value)]);
  });

  card
    .addRowEmpty()
    .addRow([label('   Card:'), `${npmjs("npx")} ${user.npm}`])
    .addRowEmpty()
    .setFooter(`${italic("I'm curious, enthusiastic and student most of the time.\nThe rest of the time I write code that others can read.")}`)
    .show();

  console.log('Tip: Try ' + chalk.cyanBright.bold('cmd/ctrl + click') + ' on the links above\n');
};


const startPrompt = () => {

  const handlePrompt = () => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'aktion',
          message: 'What do you want to do?',
          choices: [
            'Send me an email',
            'Just quit'
          ],
        }
      ])
      .then(answers => {
        switch (answers.aktion) {
          case 'Send me an email':
            handleEmailOptions();
            break;
          case 'Just quit':
            console.log('Goodbye!');
            break;
        }
      });
  }

  const handleEmailOptions = () => {

    console.log('\n' + chalk.white.bgRed.bold('Email:') + ' ' + chalk.redBright(user.email));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'emailOption',
          message: 'How would you like to proceed?',
          choices: [
            'Copy Email',
            'Write Email',
            'Just quit'
          ],
        }
      ])
      .then(answers => {

        switch (answers.emailOption) {
          case 'Write Email':
            open(`mailto:${user.email}`);
            console.log(chalk.italic('Mail program opened.\nI look forward to hearing from you!\nGoodbye!'));
            break;
          case 'Copy Email':
            clipboardy.writeSync(user.email)
            console.log(chalk.italic('Email was copied to the clipboard!\nI look forward to hearing from you!'));
            break;
          case 'Just quit':
            console.log('Goodbye!');
            break;
        }
      });
  }
  handlePrompt();
};

createCard();
startPrompt();