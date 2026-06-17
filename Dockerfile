FROM nginx:alpine

# Copy the index.html to the nginx html directory
COPY index.html /usr/share/nginx/html/index.html

# Create a custom nginx configuration
RUN cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 3001;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    error_page 404 /index.html;
}
EOF

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
