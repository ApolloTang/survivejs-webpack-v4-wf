const fonts = [
  'Roboto-Thin.ttf'
  // somehow I don't even have to list all the font
];

fonts.forEach(font=>{
  const pathToFont = './fonts/'+font;
  require(`${pathToFont}`);
});

require('./font-setup.css');

