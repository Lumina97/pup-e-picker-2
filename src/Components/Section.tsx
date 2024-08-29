import { ReactNode } from "react";
import { useDogs } from "../Providers/DogsProvider";
import { TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { setActiveTab, activeTab, dogsList } = useDogs();

  const setNewActiveTab = (newTab: TActiveTab) => {
    const newValue = newTab === activeTab ? "all" : newTab;
    setActiveTab(newValue);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === "favorite" ? "active" : ""} `}
            onClick={() => {
              setNewActiveTab("favorite");
            }}
          >
            favorited ( {dogsList["favorite"].length} )
          </div>

          <div
            className={`selector ${
              activeTab === "unFavorite" ? "active" : ""
            } `}
            onClick={() => {
              setNewActiveTab("unFavorite");
            }}
          >
            unfavorited ( {dogsList["unFavorite"].length} )
          </div>
          <div
            className={`selector ${
              activeTab === "createDog" ? "active" : ""
            }  `}
            onClick={() => {
              setNewActiveTab("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
