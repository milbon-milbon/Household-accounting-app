@echo off
echo Running frontend tests and generating coverage report...
cd next
npm install
npm run test -- --coverage
cd ..

echo Running backend tests and generating coverage report...
cd express
npm install
npm run test -- --coverage
cd ..

echo All tests and coverage reports generated.
pause
