import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import HomePage from "../Pages/HomePage";
import NotesPage from "../Pages/Notes/NotesPage";
// import SortingPage from "../Pages/DSA/Sorting Algorithm/SortingPage";
import DSAPage from "../Pages/DSA/DSAPage";
import TreesPage from "../Pages/DSA/Trees/TreesPage";
import GraphsPage from "../Pages/DSA/Graph/GraphPage";
import AlgorithmDetailPage from "../Pages/DSA/AlgorithmDetailPage";
import BubbleSort from "../Pages/DSA/Sorting Algorithm/BubbleSort";
import SelectionSort from "../Pages/DSA/Sorting Algorithm/SelectionSort";
import InsertionSort from "../Pages/DSA/Sorting Algorithm/InsertionSort";
import QuickSort from "../Pages/DSA/Sorting Algorithm/QuickSort";
import SystemDesignPage from "../Pages/SystemDesign/SystemDesignPage";
import CategoryPage from "../Pages/SystemDesign/CategoryPage";
import TopicPage from "../Pages/SystemDesign/TopicPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="dsa" element={<DSAPage />} />
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
        <Route path="system-design" element={<SystemDesignPage />} />
        <Route path="system-design/:categoryId" element={<CategoryPage />} />
        
        <Route path="system-design/:categoryId/:blockId" element={<TopicPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
