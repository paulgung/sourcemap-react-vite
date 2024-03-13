import styles from "./index.module.css";

interface IFilteredData {
  service: string;
  group: string;
  errorUrl: string;
  stack: string;
  message: string;
  log_time: string;
}
interface IProps {
  alertInfoList: IFilteredData[];
}

const MyMoniterCSS = (props: IProps) => {
  const { alertInfoList } = props;
  return (
    <div>
      {alertInfoList.length != 0 &&
        alertInfoList?.map((item, index) => {
          return (
            <div className={styles.exceptionLogContainer} key={index}>
              {Object.entries(item).map(([key, value]) => {
                return (
                  value && (
                    <div className={styles.logItem} key={key}>
                      <span className={styles.logItemDetail}>{key}:</span>
                      <span
                        className={
                          value.length > 100
                            ? styles.inlineBlack
                            : styles.inline
                        }
                      >
                        {value}
                      </span>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default MyMoniterCSS;
