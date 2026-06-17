FROM nginx:alpine

# Copy the index.html to nginx's default serving directory
COPY index.html /usr/share/nginx/html/

# Expose port 3001
EXPOSE 3001

# Configure nginx to listen on port 3001
RUN echo "server { listen 3001; location / { root /usr/share/nginx/html; index index.html; } }" > /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
