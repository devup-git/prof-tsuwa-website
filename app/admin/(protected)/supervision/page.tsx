import { getSupervisees } from "@/lib/db-queries"
import SupervisionManagerClient from "./SupervisionManagerClient"

export default async function SupervisionAdminPage() {
    const supervisees = await getSupervisees()

    return <SupervisionManagerClient initialSupervisees={supervisees} />
}
