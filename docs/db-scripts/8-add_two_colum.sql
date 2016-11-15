ALTER TABLE citygames.game ADD flag BOOLEAN;

ALTER TABLE citygames.game ADD date_flag_set DATETIME;


update game g set g.flag=1,g.date_flag_set=current_timestamp WHERE g.date_finish <=current_time
                                                                   and date_format(g.date_finish,'%Y.%m.%d') <=date_format(current_date,'%Y.%m.%d')
                                                                   and g.flag = false;



select * FROM  game g  ORDER BY g.date_flag_set DESC;


