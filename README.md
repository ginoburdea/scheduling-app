## Installation

```bash
# Make sure you have github ssh set up
# Clone the repository and its submodules
$ git clone --recurse-submodules git@github.com:ginoburdea/scheduling-app.git

# Set all required env variables
# You can find examples in .env.example, client/.env.example and server/.env.example

# Make sure you have the following ssl certificates inside client/certificates:
# - certificate.crt (certificate.crt and ca_bundle.crt combined)
# - private.key

# Start the applications
$ docker compose up --build --detached
```
