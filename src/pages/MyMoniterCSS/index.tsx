import styles from "./index.module.css";

interface IFilteredData {
  level: string;
}
interface IProps {
  alertInfo: IFilteredData[];
}

const MyMoniterCSS = (props: IProps) => {
  const { alertInfo } = props;
  return (
    <div>
      {alertInfo.length != 0 &&
        alertInfo?.map((item, index) => {
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
