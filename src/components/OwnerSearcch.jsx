import React from "react";
import { Label } from "./ui/label";
import { Input, LabelInputContainer } from "./ui/input";

const OwnerSearch = ({
  searchForOwners,
  setSearchForOwners,
  handleSearchForOwners,
}) => {
  return (
    <LabelInputContainer className="mb-4">
      <Label htmlFor="owner">Owner</Label>
      <Input
        id="owner"
        placeholder="Search owners"
        value={searchForOwners}
        onChange={(e) => setSearchForOwners(e.target.value)}
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchForOwners();
          }
        }}
      />
    </LabelInputContainer>
  );
};

export default OwnerSearch;
