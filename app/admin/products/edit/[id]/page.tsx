import EditProductClient from './EditProductClient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  
  return <EditProductClient productId={id} />;
}
