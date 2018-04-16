const fonts = [
  'fontawesome-webfont.ttf'
];

fonts.forEach(font=>{
  const pathToFont = './fonts/'+font;
  require(`${pathToFont}`);
});

require('./font-setup.css');
