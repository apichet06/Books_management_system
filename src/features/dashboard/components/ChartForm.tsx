import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { Dashboard } from '../types/dashboard';
import { useTranslation } from 'react-i18next';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

interface Props {
    data: Dashboard[];
}

export default function ChartForm({ data }: Props) {

    const { t } = useTranslation();


    const chartData: ChartData<'bar', number[], string> = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: t('dashboard.book_count'),
                data: data.map(item => item.count),
                backgroundColor: 'rgba(27, 150, 50, 0.6)',
                borderColor: 'rgba(27, 150, 50, 1)',
                borderWidth: 1,
            },
        ],
    };


    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: t('dashboard.text'),
            }, datalabels: {
                anchor: 'center',
                align: 'center',
                color: '#fff',
                font: {
                    weight: 'bold' as const,
                },
                formatter: function (value: number) {
                    return t('dashboard.book_count') + ' : ' + value;
                },
            },
        },
    };

    return (
        <>

            <Bar data={chartData} options={options} height={100} plugins={[ChartDataLabels]} /></>
    )
}
