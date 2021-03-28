npm install eslint --save-dev
npx eslint --init

clear && npx eslint app.js
clear && npx eslint src/ --fix

clear && ./node_modules/eslint/bin/eslint.js src/ --fix