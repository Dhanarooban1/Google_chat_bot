export function EmptyScreen() {
  return (
    <div className="mx-auto bg-black  border rounded  max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg  bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Dhana Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
        Welcome to our AI  Assistant!
        </p>
        <p className="leading-normal text-muted-foreground">
         Powered by our advanced ALGO engine and integrated with cutting-edge AI, our chatbot—devdoot—is here to help you execute trades efficiently and intelligently. 
        </p>
        <p className="leading-normal text-muted-foreground">
        Experience the future of fully automated trading with our breakthrough technology. How can I assist you today?
        </p>
      </div>
    </div>
  )
}
