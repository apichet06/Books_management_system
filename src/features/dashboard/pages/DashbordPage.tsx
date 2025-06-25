

import ChartForm from '../components/ChartForm'
import useDashboard from '../hooks/useDashboard';


export default function DashbordPage() {

    const { dashboard } = useDashboard();


    return (
        <>
            <ChartForm data={dashboard} />

        </>
    )
}
