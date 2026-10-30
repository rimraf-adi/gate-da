import TrendsTabs from '@/components/TrendsTabs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (<><TrendsTabs />{children}</>);
}
