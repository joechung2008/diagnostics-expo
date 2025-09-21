import { Environment, type EnvironmentType } from '@/lib/environment';
import type { Diagnostics, KeyedNavLink } from '@/lib/types';
import { isExtensionInfo } from '@/lib/utils';
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'expo-router';

interface AppContextType {
  environment: EnvironmentType;
  diagnostics: Diagnostics | undefined;
  error?: Error;
  loading: boolean;
  showEnvironmentDropdown: boolean;
  extension: any;
  showList: boolean;
  showPaasServerless: boolean;
  currentId?: string;
  setEnvironment: (env: EnvironmentType) => void;
  setShowEnvironmentDropdown: (show: boolean) => void;
  setExtension: (ext: any) => void;
  setShowList: (show: boolean) => void;
  handleEnvironmentSelect: (env: EnvironmentType) => void;
  handleLinkClick: (item: any) => void;
  handlePaasServerlessPress: () => void;
  handleWebsitesPress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = use(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [environment, setEnvironment] = useState<EnvironmentType>(
    Environment.Public
  );
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [showEnvironmentDropdown, setShowEnvironmentDropdown] = useState(false);
  const [extension, setExtension] = useState<any>();
  const [showList, setShowList] = useState<boolean>(true);
  const [currentId, setCurrentId] = useState<string>();

  const showPaasServerless = isExtensionInfo(
    diagnostics?.extensions?.['paasserverless']
  );

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (!environment) {
        return;
      }

      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(environment);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch diagnostics: ${response.statusText}`
          );
        }
        const data: Diagnostics = await response.json();
        setDiagnostics(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, [environment]);

  const handleEnvironmentSelect = useCallback(
    (env: EnvironmentType) => {
      setEnvironment(env);
      setExtension(undefined);
      setShowList(true);
      setCurrentId(undefined);
      setError(undefined);
      setShowEnvironmentDropdown(false);
      router.push('/');
    },
    [router]
  );

  const handleLinkClick = useCallback(
    (item: KeyedNavLink) => {
      if (item?.key) {
        const { key } = item;
        const ext = diagnostics?.extensions[key];
        if (isExtensionInfo(ext)) {
          setExtension(diagnostics?.extensions[key]);
          setShowList(false);
          setCurrentId(key);
          router.push(`/extensions/${key}`);
        }
      }
    },
    [diagnostics?.extensions, router]
  );

  const handlePaasServerlessPress = useCallback(() => {
    const ext = diagnostics?.extensions['paasserverless'];
    if (isExtensionInfo(ext)) {
      setExtension(ext);
      setShowList(false);
      setCurrentId('paasserverless');
      router.push('/extensions/paasserverless');
    }
  }, [diagnostics?.extensions, router]);

  const handleWebsitesPress = useCallback(() => {
    const ext = diagnostics?.extensions['websites'];
    if (isExtensionInfo(ext)) {
      setExtension(ext);
      setShowList(false);
      setCurrentId('websites');
      router.push('/extensions/websites');
    }
  }, [diagnostics?.extensions, router]);

  const value = useMemo<AppContextType>(
    () => ({
      environment,
      diagnostics,
      error,
      loading,
      showEnvironmentDropdown,
      extension,
      showList,
      showPaasServerless,
      currentId,
      setEnvironment,
      setShowEnvironmentDropdown,
      setExtension,
      setShowList,
      handleEnvironmentSelect,
      handleLinkClick,
      handlePaasServerlessPress,
      handleWebsitesPress,
    }),
    [
      environment,
      diagnostics,
      error,
      loading,
      showEnvironmentDropdown,
      extension,
      showList,
      showPaasServerless,
      currentId,
      setEnvironment,
      setShowEnvironmentDropdown,
      setExtension,
      setShowList,
      handleEnvironmentSelect,
      handleLinkClick,
      handlePaasServerlessPress,
      handleWebsitesPress,
    ]
  );

  return <AppContext value={value}>{children}</AppContext>;
};
