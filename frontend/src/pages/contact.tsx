import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header";
import { Footer } from "../components/footer";
import Layout from "../components/layout";
import InputField from "../components/input-field";
import Submit from "../components/submit";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Layout as="main">
        <form
          className="flex flex-col space-y-5 max-w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl">Contact</h1>
          <div className="flex space-x-3">
            <InputField
              label="First Name"
              required
              {...register("firstName", { required: true })}
            />
            <InputField
              label="Last Name"
              required
              {...register("lastName", { required: true })}
            />
          </div>
          <InputField
            label="Email Address"
            type="email"
            required
            {...register("email", { required: true })}
          />
          <InputField
            label="Subject"
            required
            {...register("subject", { required: true })}
          />
          <InputField
            label="Message"
            textarea
            required
            {...register("message", { required: true })}
          />
          <Submit className="ml-auto text-sm py-2">Submit</Submit>
        </form>
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
