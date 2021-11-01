import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.req;
//   //fetch data from server

//   return {
//     props: {
//       meetups: DUMMY_LIST,
//     },
//   };
// }
export async function getStaticProps() {
  // fetch data from apiResolver
  const client = await MongoClient.connect(
    "mongodb+srv://omkar:omkarsase21@cluster0.pk26j.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
