import styles from "./index.module.css";

const filteredData = [
  {
    app: "console-portal",
    host_ip: "",
    level: "ERROR",
    log_time: "2023-11-13 16:20:00",
    message: "创建商品失败:",
    pod: "b2cweb-console-portal-5f5db9c457-llqnf",
    stack_trace:
      "com.myhexin.console.common.exception.CustomException: 文章未审核通过，创建商品失败!\n\tat com.myhexin.console.publics.ttp.shop.impl.HxShopServiceImpl.create(HxShopServiceImpl.java:80)\n\tat com.myhexin.console.publics.ttp.shop.impl.HxShopServiceImpl$$FastClassBySpringCGLIB$$ff024499.invoke(<generated>)\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:771)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)\n\tat org.springframework.retry.annotation.AnnotationAwareRetryOperationsInterceptor.invoke(AnnotationAwareRetryOperationsInterceptor.java:156)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:691)\n",
    thread: "Thread-518",
  },
  {
    app: "console-portal",
    host_ip: "",
    level: "ERROR",
    log_time: "2023-11-13 16:20:00",
    message: "创建商品失败:",
    pod: "b2cweb-console-portal-5f5db9c457-llqnf",
    stack_trace:
      "com.myhexin.console.common.exception.CustomException: 文章未审核通过，创建商品失败!\n\tat com.myhexin.console.publics.ttp.shop.impl.HxShopServiceImpl.create(HxShopServiceImpl.java:80)\n\tat com.myhexin.console.publics.ttp.shop.impl.HxShopServiceImpl$$FastClassBySpringCGLIB$$ff024499.invoke(<generated>)\n\tat org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:771)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)\n\tat org.springframework.retry.annotation.AnnotationAwareRetryOperationsInterceptor.invoke(AnnotationAwareRetryOperationsInterceptor.java:156)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:749)\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:691)\n",
    thread: "Thread-518",
  },
];

const MyMoniterCSS = () => {
  return (
    <div>
      {filteredData.length != 0 &&
        filteredData?.map((item) => {
          return (
            <div className={styles.exceptionLogContainer}>
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
