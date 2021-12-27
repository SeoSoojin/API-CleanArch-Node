import { PostGetterService, PostWriterService, PostDeleterService } from "../domain/services/services";
import { PostgresPostGetter, PostgresPostWriter, PostgresPostDeleter } from "../gateways/postgres";
import { UCPostGetter, UCPostWriter, UCPostDeleter } from "../usecases";

class ContainerBuilder {

    newPostGetterCtn(user: string, host: string, database: string, password: string, port: number): UCPostGetter {

        return new UCPostGetter(new PostGetterService(new PostgresPostGetter(user, host, database, password, port)))

    }

    newPostDeleterCtn(user: string, host: string, database: string, password: string, port: number): UCPostDeleter {

        return new UCPostDeleter(new PostDeleterService(new PostgresPostDeleter(user, host, database, password, port)))

    }

    
    newPostWriterCtn(user: string, host: string, database: string, password: string, port: number): UCPostWriter {

        return new UCPostWriter(new PostWriterService(new PostgresPostWriter(user, host, database, password, port)))

    }

}

export default ContainerBuilder