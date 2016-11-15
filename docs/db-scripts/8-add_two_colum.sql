ALTER TABLE citygames.game ADD flag BOOLEAN NULL;

ALTER TABLE citygames.game ADD date_flag_set DATETIME NOT NULL;


update game g set g.flag=1,g.date_flag_set=current_timestamp WHERE g.date_finish is not null
                                  and date_format(g.date_finish,'%Y.%m.%d') <=date_format(current_date,'%Y.%m.%d')
                                  and g.flag is NULL;



select * FROM  game g  ORDER BY g.date_flag_set DESC;


