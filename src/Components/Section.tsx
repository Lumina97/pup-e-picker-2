import { ReactNode } from "react";
import { useDogs } from "../Providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { setNewActiveTab, activeTab, favoriteDogCount, nonFavoriteDogCount } =
    useDogs();

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
            favorited ( {favoriteDogCount} )
          </div>

          <div
            className={`selector ${
              activeTab === "unFavorite" ? "active" : ""
            } `}
            onClick={() => {
              setNewActiveTab("unFavorite");
            }}
          >
            unfavorited ( {nonFavoriteDogCount} )
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
