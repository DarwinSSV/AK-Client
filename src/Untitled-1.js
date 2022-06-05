
      <Result>
      {' '}
      {checkbox1 && (
        <p>
          {JSON.stringify(
            checkbox1.map((e) => {
              console.log(e);
              delete e.checkbox;
              return e;
            }) && checkbox1
          )}
        </p>
      )}
    </Result>