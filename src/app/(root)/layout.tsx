import StreamClientProvider from "@/providers/StreamClientProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
     return (
          <StreamClientProvider>{children}</StreamClientProvider>
     )
}

export default layout
