import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface LayoutProviderProps {
    children: ReactNode
}

export interface BreadcrumbProps {
    title: string,
    pathname: string
}

interface LayoutContextProps {
    breadcrumbs?: Array<BreadcrumbProps>,
    appendBreadcrumb?: any    
}

const LayoutContext = createContext<LayoutContextProps>({});

export function useLayoutContext() {
    return useContext(LayoutContext);
};

export function LayoutProvider({ children }: LayoutProviderProps) {
    const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbProps>>([]);

    const appendBreadcrumb = useCallback(
        (item: Array<BreadcrumbProps>) => {
            setBreadcrumbs(item)
        }, []
    );

    const value = useMemo(
        () => {
            return {
                breadcrumbs, appendBreadcrumb
            }
        }, [breadcrumbs]
    );

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};