import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type FarmerProfile = {
  name: string;
  phone: string;
  village: string;
  district: string;
};

export type Animal = {
  id: string;
  type: string;
  name: string;
  breed: string;
  age: string;
};

export type Farm = {
  id: string;
  name: string;
  crop: string;
  area: string;
  location: string;
};

type FarmDataContextValue = {
  farmer: FarmerProfile;
  updateFarmer: (profile: FarmerProfile) => void;
  animals: Animal[];
  addAnimal: (animal: Omit<Animal, "id">) => void;
  farms: Farm[];
  addFarm: (farm: Omit<Farm, "id">) => void;
};

const FarmDataContext = createContext<FarmDataContextValue | undefined>(undefined);

export function FarmDataProvider({ children }: { children: ReactNode }) {
  const [farmer, setFarmer] = useState<FarmerProfile>({ name: "", phone: "", village: "", district: "" });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);

  const value = useMemo(() => ({
    farmer,
    updateFarmer: setFarmer,
    animals,
    addAnimal: (animal: Omit<Animal, "id">) => setAnimals((current) => [{ ...animal, id: String(Date.now()) }, ...current]),
    farms,
    addFarm: (farm: Omit<Farm, "id">) => setFarms((current) => [{ ...farm, id: String(Date.now()) }, ...current]),
  }), [animals, farmer, farms]);

  return <FarmDataContext.Provider value={value}>{children}</FarmDataContext.Provider>;
}

export function useFarmData() {
  const context = useContext(FarmDataContext);
  if (!context) throw new Error("useFarmData must be used within FarmDataProvider");
  return context;
}
