FROM nginx:1.11-alpine

#RUN apk add --no-cache make gcc g++ python

#RUN apk add --update bash \
#                     git

ADD ./ng2-admin /var/www

#RUN cd /var/www

#WORKDIR /var/www

#ADD ./ng2-admin/run-dev.sh /var/www

#COPY ng2-admin/dist /var/www
#COPY docker/nginx/conf.d/* /etc/nginx/conf.d/

RUN chmod 755 /var/www/run-prod.sh && \
    /var/www/run-prod.sh

CMD ["nginx", "-g", "daemon off;"]

#EXPOSE 8001
#ENTRYPOINT ["npm", "run", "server:prod"]
#ENTRYPOINT ["npm", "run", "server:dev"]
