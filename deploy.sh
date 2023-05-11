yarn build:staging
docker build -t registry.gitlab.com/smartalarmsystem/web-authority .
docker push registry.gitlab.com/smartalarmsystem/web-authority