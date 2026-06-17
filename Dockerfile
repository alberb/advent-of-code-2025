FROM nginx:alpine

# Copy the index.html to nginx's default serving directory
COPY index.html /usr/share/nginx/html/index.html

# Create a custom nginx config that listens on port 3001
RUN rm /etc/nginx/conf.d/default.conf

RUN cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 3001;
    server_name _;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Expose port 3001
EXPOSE 3001

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
