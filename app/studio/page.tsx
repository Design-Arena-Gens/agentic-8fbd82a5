import PostGenerator from "@/components/PostGenerator";
import DiagramBuilder from "@/components/DiagramBuilder";

export default function StudioPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Post Studio</h1>
      <PostGenerator />
      <DiagramBuilder />
    </div>
  );
}
