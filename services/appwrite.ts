import { Client, Databases, ID, Query } from "react-native-appwrite";
//track searches made by a by users

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);

export const logSearch = async (query: string, movie: Movie) => {
  try {
    if (!movie || !movie.id) {
      console.error("Invalid movie object:", movie);
      throw new Error("Movie object is invalid or missing ID");
    }

    console.log("Movie ID:", movie.id, "Type:", typeof movie.id);

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
interface Movie {
  title: unknown;
  id: number;
  poster_path: string;
}
