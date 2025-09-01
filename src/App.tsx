import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AmplifyProvider } from "./providers/amplify-provider";
import { AuthProvider } from "./providers/auth-provider";
import { Header } from "./components/header";
import { AttachmentsListPage } from "./pages/AttachmentList";
import { NewAttachmentPage } from "./pages/NewAttachment";
import { AttachmentDetailPage } from "./pages/AttachmentDetailPage";

function App() {
  return (
    <AmplifyProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route
              path="/*"
              element={
                <AuthProvider>
                  <Header />
                  <main className="max-w-4xl mx-auto px-4 py-6">
                    <Routes>
                      <Route path="/attachments" element={<AttachmentsListPage />} />
                      <Route path="/attachments/new" element={<NewAttachmentPage />} />
                      <Route path="/attachments/:id" element={<AttachmentDetailPage />} />
                      <Route path="/" element={<Navigate to="/attachments" replace />} />
                    </Routes>
                  </main>
                </AuthProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </AmplifyProvider>
  );
}

export default App;
