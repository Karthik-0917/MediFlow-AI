import MainLayout from "../layouts/MainLayout";
import AllApprovals from "../components/AllApprovals";

function Approvals() {
  return (
    <MainLayout>

      <div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Approval Management
        </h1>

        <AllApprovals />

      </div>

    </MainLayout>
  );
}

export default Approvals;