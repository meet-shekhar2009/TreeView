function Loader() {
  return <h1>loading...</h1>;
}

export function useLoadApi(
  defaultDataValue,
  servicePromiseCallback,
  manipulateResponseCallback,
  condition = true,
  dependencies = []
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultDataValue);

  async function loadDataSource() {
    try {
      setIsLoading(true);
      const response = await servicePromiseCallback();
      if (response) {
        if (manipulateResponseCallback) {
          setData(manipulateResponseCallback(response));
        } else {
          setData(response);
        }
      }
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (condition) {
      loadDataSource();
    }
  }, dependencies);

  return [isLoading, , data, loadDataSource];
}
