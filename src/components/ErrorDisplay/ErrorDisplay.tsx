type Props = {
  message: string | undefined;
  refetch: any;
};

const ErrorDisplay = ({ message, refetch }: Props) => {
  return (
    <div className="grid place-items-center" style={{ height: "30rem" }}>
      <div className="flex flex-col space-y-[1rem]">
        <h1 className="text-[1.2rem] text-center">
          {message || "Something went wrong"}
        </h1>

        <button
          onClick={() => refetch()}
          className="bg-black rounded-[5px] w-[10rem] mx-auto text-white py-[0.5rem] px-[1rem]"
        >
          Retry
        </button>
      </div>
    </div>
  );
};
export default ErrorDisplay;
