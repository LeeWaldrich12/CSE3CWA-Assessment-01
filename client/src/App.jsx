import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateQuote from "./CreateQuote";
import QuoteList from "./QuoteList";
import QuoteDetail from "./QuoteDetails";
import EditQuote from "./EditQuote";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateQuote />} />
                <Route path="/quotes" element={<QuoteList />} />
                <Route path="/quotes/:id" element={<QuoteDetail />} />
                <Route path="/edit/:id" element={<EditQuote />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;