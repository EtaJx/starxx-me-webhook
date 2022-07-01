echo "updating repo"
cd ~/nextjs-personal
git fetch --all
git pull origin master
echo "update repo successfully"
# delete old node_modules folders & force re-install
echo "updating node_modules"
rm -rf node_modules && yarn install
echo "update node_modules successfully"
# delete old article list cached file
rm data.json
# then restart service re-pull fresh list
echo "restating service"
pm2 restart nextjs-personal
echo "restarted"
