#!/bin/sh
echo Installing the root packages
npm clean-install
node scripts/createEnvFile

echo 
echo Installing the server packages
cd server
npm clean-install

echo 
echo Migrating the database
node ../scripts/createEnvFile
prisma generate
prisma migrate deploy

echo 
echo Installing the client packages
cd ../client
npm clean-install
node ../scripts/createEnvFile

