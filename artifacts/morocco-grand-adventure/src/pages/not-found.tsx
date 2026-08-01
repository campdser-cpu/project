import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              {t('error_not_found')}
            </h1>
          </div>

          <p className="mt-4 mb-6 text-sm text-gray-600">
            {t('error_not_found_sub')}
          </p>
          
          <Link href="/" className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold">
            {t('error_go_home')}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
