## Local setup

To setup the project locally create two files `.env` and `.env.local` and paste data from `.env.example` file.

SKY_SCANNER_API key can be found here:
https://developers.skyscanner.net/docs/getting-started/authentication

To obtain GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET go to:
https://console.cloud.google.com/apis/credentials
and follow the manual.

## Running app locally

To run the app you'll need docker installed as well as docker-compose. Firstly run `docker-compose up -d`
to run the image in detached mode. To shut down a container run like this you'd use the following command: `docker-compose down`(`--volume` is optional for deleting the created volume). After that you'll need to run `npx prisma db push` to apply schema which is located in `prisma/schema.prisma`. Now you can generate client using `npx prisma generate` command. After this executing `npm run dev` will greet you with the app on `http://localhost:3000`.
