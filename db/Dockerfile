FROM mongo

# Environment variables for Initializing DB
# Mongodb Global variables
ENV MONGO_INITDB_ROOT_USERNAME 'prd_debate_admin'
ENV MONGO_INITDB_ROOT_PASSWORD 'debate2140'

# Environment variables
ENV TARGET_DATABASE 'debate_web'
ENV TARGET_USERNAME 'debate_manager'
ENV TARGET_PASSWORD 'manPrd4892#'

# Copy Initialize file
COPY ./init.sh /docker-entrypoint-initdb.d/init.sh

EXPOSE 27017
