import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useDogs } from "./Providers/DogsProvider";

export function App() {
  const { activeTab } = useDogs();
  return (
    <>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {activeTab !== "createDog" && <Dogs />}
          {activeTab === "createDog" && <CreateDogForm />}
        </Section>
      </div>
    </>
  );
}
