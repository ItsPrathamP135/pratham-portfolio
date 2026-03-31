import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import HomePage from "../Pages/HomePage";
import NotesPage from "../Pages/NotesPage";
// import SortingPage from "../Pages/DSA/Sorting Algorithm/SortingPage";
import DSAPage from "../Pages/DSA/DSAPage";
import TreesPage from "../Pages/DSA/TreesPage";
import GraphsPage from "../Pages/DSA/GraphPage";
import AlgorithmDetailPage from "../Pages/DSA/AlgorithmDetailPage";
import BubbleSort from "../Pages/DSA/Sorting Algorithm/BubbleSort";
import SelectionSort from "../Pages/DSA/Sorting Algorithm/SelectionSort";
import InsertionSort from "../Pages/DSA/Sorting Algorithm/InsertionSort";
import QuickSort from "../Pages/DSA/Sorting Algorithm/QuickSort";
import CAGRCalculator from "../Caxulator/CAGRCalculator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pratham-portfolio/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="dsa" element={<DSAPage />} />
        <Route path="dsa/sorting" element={<CAGRCalculator />} />
        <Route path="dsa/sorting/bubble-sort" element={<BubbleSort />} />
        <Route path="dsa/sorting/selection-sort" element={<SelectionSort />} />
        <Route path="dsa/sorting/insertion-sort" element={<InsertionSort />} />
        <Route path="dsa/sorting/quick-sort" element={<QuickSort />} />
        <Route path="dsa/trees" element={<TreesPage />} />
        <Route path="dsa/graphs" element={<GraphsPage />} />
        <Route
          path="dsa/sorting/:algorithmId"
          element={<AlgorithmDetailPage />}
        />
        <Route path="dsa/trees/:treeId" element={<AlgorithmDetailPage />} />
        <Route
          path="dsa/graphs/:algorithmId"
          element={<AlgorithmDetailPage />}
        />
        <Route path="dsa/calculator" element={<CAGRCalculator />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
